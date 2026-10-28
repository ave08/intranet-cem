import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { Badge } from "../components/ui/badge";
import { Layout } from "../components/Layout";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

import {
  Mail,
  Phone,
  Briefcase,
  Calendar,
  Check,
  X,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  UserCheck,
  UserPlus,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

/* ================= TYPES ================= */

type Employee = {
  id: number;
  name: string;
  prenom: string;
  email: string;
  matricule: string;
  telephone: string;
  fonction: string;
  status: "active" | "inactive";
  created_at: string;
};

type AccessRequest = {
  id: number;
  nom_temp: string;
  prenom_temp: string;
  sexe: "Masculin" | "Féminin";
  email_temp: string;
  telephone_temp: string;
  matricule_temp: string;
  status: "pending" | "approved" | "rejected";
  user?: Employee | null;
  created_at: string;
};

function AdminPage() {
  const { props } = usePage<{
    auth: { user: { roles: string[] } };
    employees: Employee[];
    accessRequests: AccessRequest[];
  }>();

  const { employees, accessRequests, auth } = props;
  const { flash } = usePage().props as any;

  const [searchQuery, setSearchQuery] = useState("");
  const [expandedWorkers, setExpandedWorkers] = useState<Set<number>>(new Set());

  const [selectedRequest, setSelectedRequest] = useState<AccessRequest | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  /* ================= SECURITY ================= */

  const userRoles = auth.user?.roles || [];
  if (!userRoles.includes("Administrateur")) {
    return <div className="p-6 text-red-500">Accès refusé (Rôle : {userRoles.join(', ') || 'Aucun'})</div>;
  }

  /* ================= ACTIONS ================= */

  const toggleWorkerDetails = (id: number) => {
    const next = new Set(expandedWorkers);
    next.has(id) ? next.delete(id) : next.add(id);
    setExpandedWorkers(next);
  };

  const verifyRequest = (req: AccessRequest) => {
    setSelectedRequest(req);
    setShowModal(true);
  };

  const approveRequest = (id: number) => {
    router.post(`/access-requests/${id}/approve`, {}, {
      onSuccess: () => {
        setShowModal(false);
        router.reload({ only: ["employees", "accessRequests"] });
      },
    });
  };

  const rejectRequest = (id: number) => {
    router.post(`/access-requests/${id}/reject`, {}, {
      onSuccess: () => {
        setShowModal(false);
        router.reload({ only: ["accessRequests"] });
      },
    });
  };

  const toggleEmployeeStatus = (id: number) => {
    router.patch(`/employees/${id}/toggle`);
  };

  const removeEmployee = (id: number) => {
    router.delete(`/employees/${id}`);
  };

  /* ================= FILTER ================= */

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">
      <main className="flex-1 p-6 space-y-4">
        {/* Flash messages */}
        {flash?.success && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 border border-green-200 rounded">
            {flash.success}
          </div>
        )}

        {flash?.error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded">
            {flash.error}
          </div>
        )}

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 flex justify-between">
              <div>
                <p>Total</p>
                <h3>{employees.length}</h3>
              </div>
              <Briefcase />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex justify-between">
              <div>
                <p>Actifs</p>
                <h3>
                  {employees.filter((e) => e.status === "active").length}
                </h3>
              </div>
              <UserCheck />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex justify-between">
              <div>
                <p>Demandes</p>
                <h3>{accessRequests.length}</h3>
              </div>
              <UserPlus />
            </CardContent>
          </Card>
        </div>

        {/* MAIN */}
        <Card>
          <CardHeader>
            <CardTitle>Gestion du Personnel</CardTitle>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="workers">

              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="workers">Personnel</TabsTrigger>
                <TabsTrigger value="requests">Demandes
                  {accessRequests.length > 0 && (
                    <Badge className="ml-2">{accessRequests.length}</Badge>
                  )}
                </TabsTrigger>
              </TabsList>

              {/* EMPLOYEES */}
              <TabsContent value="workers">
                <Input
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                {filteredEmployees.map((emp) => {
                  const expanded = expandedWorkers.has(emp.id);

                  return (
                    <Card key={emp.id} className="mt-3">
                      <CardContent className="p-4">
                        <div className="flex justify-between">
                          <div>
                            <h4>{emp.name} {emp.prenom}</h4>
                            <p>{emp.fonction}</p>
                          </div>

                          <div className="flex gap-2">
                            <Button onClick={() => toggleWorkerDetails(emp.id)}>
                              {expanded ? <ChevronUp /> : <ChevronDown />}
                            </Button>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button><MoreVertical /></Button>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => toggleEmployeeStatus(emp.id)}>
                                  Toggle Status
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={() => removeEmployee(emp.id)}>
                                  Supprimer
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        {expanded && (
                          <div className="mt-3">
                            <p><Mail /> {emp.email}</p>
                            <p><Phone /> {emp.telephone}</p>
                            <p><Calendar /> {emp.created_at}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </TabsContent>

              {/* REQUESTS */}
              <TabsContent value="requests">
                {accessRequests.map((req) => (
                  <Card key={req.id} className="mt-3">
                    <CardContent className="p-4">
                      <p><Mail /> {req.email_temp}</p>
                      <p><Phone /> {req.telephone_temp}</p>
                      <p>{req.nom_temp} {req.prenom_temp}</p>

                      <div className="flex gap-2 mt-2">
                        <Button onClick={() => verifyRequest(req)}>
                          Vérifier
                        </Button>

                        <Button
                          variant="destructive"
                          onClick={() => rejectRequest(req.id)}
                        >
                          <X /> Rejeter
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

            </Tabs>
          </CardContent>
        </Card>

        {/* MODAL */}
        {showModal && selectedRequest && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded w-full max-w-lg space-y-4">

              <h2 className="font-bold text-lg">Vérification</h2>

              <div>
                <h3 className="font-semibold">Saisie utilisateur</h3>
                <p>{selectedRequest.nom_temp}</p>
                <p>{selectedRequest.prenom_temp}</p>
                <p>{selectedRequest.telephone_temp}</p>
                <p>{selectedRequest.email_temp}</p>
                <p>{selectedRequest.matricule_temp}</p>
              </div>

              <div>
                <h3 className="font-semibold">Base de données</h3>
                {selectedRequest.user ? (
                  <>
                    <p>{selectedRequest.user.name}</p>
                    <p>{selectedRequest.user.prenom}</p>
                    <p>{selectedRequest.user.telephone}</p>
                    <p>{selectedRequest.user.email}</p>
                    <p>{selectedRequest.user.matricule}</p>
                  </>
                ) : (
                  <p className="text-red-500">Utilisateur introuvable</p>
                )}
              </div>

              <div className="flex justify-between">
                <Button onClick={() => setShowModal(false)}>Fermer</Button>

                {selectedRequest.user && (
                  <div className="flex gap-2">
                    <Button onClick={() => approveRequest(selectedRequest.id)}>
                      <Check /> Approuver
                    </Button>

                    <Button
                      variant="destructive"
                      onClick={() => rejectRequest(selectedRequest.id)}
                    >
                      <X /> Refuser
                    </Button>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}

AdminPage.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;

export default AdminPage;