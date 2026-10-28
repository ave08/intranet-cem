import { useState } from "react";
import { Layout } from "../components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Textarea } from "../components/ui/textarea";
import { 
  Search, 
  HelpCircle,
  Book,
  Shield,
  Plus,
  Users,
  Settings,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "general" | "account" | "security" | "products" | "technical";
}

const initialFaqs: FAQ[] = [
  {
    id: "1",
    question: "Comment créer une nouvelle publication ?",
    answer: "Pour créer une nouvelle publication, cliquez sur la zone de texte 'Quoi de neuf ?' en haut de votre fil d'actualité. Rédigez votre message, ajoutez éventuellement une image, puis cliquez sur le bouton 'Publier'. Votre publication apparaîtra dans le fil d'actualité après validation par les modérateurs.",
    category: "general",
  },
  {
    id: "2",
    question: "Comment réinitialiser mon mot de passe ?",
    answer: "Pour réinitialiser votre mot de passe, cliquez sur 'Mot de passe oublié ?' sur la page de connexion. Entrez votre adresse email professionnelle et vous recevrez un lien de réinitialisation. Suivez les instructions dans l'email pour créer un nouveau mot de passe. Pour des raisons de sécurité, le lien est valable pendant 24 heures.",
    category: "account",
  },
  {
    id: "3",
    question: "Qui peut voir mes publications ?",
    answer: "Toutes vos publications sont visibles uniquement par les employés de Caisse Épargne de Madagascar. Ce réseau social est entièrement privé et sécurisé. Aucune personne externe à l'entreprise ne peut accéder au contenu.",
    category: "security",
  },
  {
    id: "4",
    question: "Comment modifier mon profil ?",
    answer: "Cliquez sur votre avatar en haut à droite, puis sélectionnez 'Mon profil'. Vous pouvez modifier votre photo de profil, votre description, et vos informations de contact. Les modifications du nom et de l'adresse email doivent être validées par le service RH.",
    category: "account",
  },
  {
    id: "5",
    question: "Quels types de contenu puis-je publier ?",
    answer: "Vous pouvez publier des actualités professionnelles, partager des réussites d'équipe, poser des questions, demander de l'aide sur des projets, et partager des informations utiles. Le contenu doit rester professionnel et respecter la charte de l'entreprise. Évitez les contenus personnels non liés au travail.",
    category: "general",
  },
  {
    id: "6",
    question: "Comment signaler un contenu inapproprié ?",
    answer: "Si vous voyez un contenu inapproprié, cliquez sur les trois points en haut à droite de la publication et sélectionnez 'Signaler'. L'équipe de modération examinera le contenu dans les plus brefs délais. Tous les signalements sont traités de manière confidentielle.",
    category: "security",
  },
  {
    id: "7",
    question: "Comment accéder aux ressources de formation ?",
    answer: "Cliquez sur 'Ressources' dans le menu de navigation gauche. Vous y trouverez tous les documents de formation, guides, procédures, et autres ressources utiles organisés par catégorie. Vous pouvez télécharger les documents pour une consultation hors ligne.",
    category: "general",
  },
  {
    id: "8",
    question: "Mes données sont-elles sécurisées ?",
    answer: "Oui, toutes vos données sont protégées par un chiffrement de niveau bancaire. Nous utilisons les mêmes protocoles de sécurité que pour nos services bancaires. Les serveurs sont hébergés localement à Madagascar avec des sauvegardes quotidiennes. Aucune donnée n'est partagée avec des tiers.",
    category: "security",
  },
  {
    id: "9",
    question: "Comment recevoir des notifications ?",
    answer: "Par défaut, vous recevez des notifications pour les mentions, commentaires sur vos publications, et messages importants. Vous pouvez personnaliser vos préférences de notification dans Paramètres > Notifications. Vous pouvez choisir de recevoir des notifications par email ou uniquement dans l'application.",
    category: "account",
  },
  {
    id: "10",
    question: "Comment trouver mes collègues ?",
    answer: "Utilisez la section 'Découvrir' pour parcourir la liste des employés par département. Vous pouvez également utiliser la barre de recherche pour trouver une personne spécifique par son nom ou son rôle. Cliquez sur 'Suivre' pour voir leurs publications dans votre fil.",
    category: "general",
  },
  {
    id: "11",
    question: "Qu'est-ce que la section 'Tâches' ?",
    answer: "La section 'Tâches' vous permet de gérer vos projets et activités professionnelles. Vous pouvez créer des tâches, les assigner à des collègues, définir des échéances, et suivre l'avancement. C'est un outil de gestion de projet intégré pour faciliter la collaboration.",
    category: "technical",
  },
  {
    id: "12",
    question: "Comment puis-je consulter les événements à venir ?",
    answer: "Les événements à venir sont affichés dans la barre latérale droite de la page d'accueil. Vous pouvez également accéder à la section 'Événements' pour voir le calendrier complet. Cliquez sur un événement pour voir les détails et confirmer votre participation.",
    category: "general",
  },
  {
    id: "13",
    question: "Puis-je utiliser l'application sur mobile ?",
    answer: "Oui, notre plateforme est entièrement responsive et fonctionne parfaitement sur mobile et tablette. Pour une meilleure expérience, nous recommandons d'ajouter le site à votre écran d'accueil. Une application mobile native est en cours de développement et sera disponible prochainement.",
    category: "technical",
  },
  {
    id: "14",
    question: "Comment contacter le support technique ?",
    answer: "Pour toute assistance technique, contactez le service IT via l'email support-it@caisse-epargne.mg ou utilisez le bouton 'Aide' en bas de page. Le support est disponible du lundi au vendredi de 8h à 17h. Pour les urgences en dehors de ces horaires, appelez le +261 20 XX XXX XX.",
    category: "technical",
  },
  {
    id: "15",
    question: "Combien de temps mes publications restent-elles visibles ?",
    answer: "Vos publications restent visibles indéfiniment, sauf si vous les supprimez ou si elles sont retirées par les modérateurs. Vous pouvez modifier ou supprimer vos publications à tout moment en cliquant sur les trois points en haut à droite de votre publication.",
    category: "general",
  },
];

export function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>(initialFaqs);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [newCategory, setNewCategory] = useState<FAQ["category"]>("general");

  const handleAddFAQ = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) {
      return;
    }

    const newFAQ: FAQ = {
      id: String(faqs.length + 1),
      question: newQuestion.trim(),
      answer: newAnswer.trim(),
      category: newCategory,
    };

    setFaqs([newFAQ, ...faqs]);
    setNewQuestion("");
    setNewAnswer("");
    setNewCategory("general");
    setIsDialogOpen(false);
  };

  const categories = [
    { id: "all", label: "Toutes", icon: Book, count: faqs.length },
    { id: "general", label: "Général", icon: HelpCircle, count: faqs.filter(f => f.category === "general").length },
    { id: "account", label: "Compte", icon: Users, count: faqs.filter(f => f.category === "account").length },
    { id: "security", label: "Sécurité", icon: Shield, count: faqs.filter(f => f.category === "security").length },
    { id: "technical", label: "Technique", icon: Settings, count: faqs.filter(f => f.category === "technical").length },
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "general":
        return "bg-blue-100 text-blue-700";
      case "account":
        return "bg-purple-100 text-purple-700";
      case "security":
        return "bg-green-100 text-green-700";
      case "products":
        return "bg-orange-100 text-orange-700";
      case "technical":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "general":
        return "Général";
      case "account":
        return "Compte";
      case "security":
        return "Sécurité";
      case "products":
        return "Produits";
      case "technical":
        return "Technique";
      default:
        return category;
    }
  };

  return (
    <main className="flex-1 w-full min-w-0 space-y-3 sm:space-y-4">
      {/* Header */}
      <Card className="border-none shadow-sm" style={{ borderTop: '4px solid #e2001a' }}>
        <CardHeader className="text-center pb-4">
          <div className="flex justify-end mb-2">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="text-white"
                  style={{ background: '#e2001a' }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter une FAQ
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Ajouter une nouvelle FAQ</DialogTitle>
                  <DialogDescription>
                    Créez une nouvelle question fréquemment posée avec sa réponse.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Question</label>
                    <Input
                      placeholder="Entrez la question..."
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Réponse</label>
                    <Textarea
                      placeholder="Entrez la réponse détaillée..."
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                      rows={6}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Catégorie</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as FAQ["category"])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e2001a]"
                    >
                      <option value="general">Général</option>
                      <option value="account">Compte</option>
                      <option value="security">Sécurité</option>
                      <option value="technical">Technique</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={handleAddFAQ}
                    disabled={!newQuestion.trim() || !newAnswer.trim()}
                    className="text-white"
                    style={{ background: '#e2001a' }}
                  >
                    Ajouter
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center" style={{ background: '#e2001a' }}>
            <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <CardTitle className="text-xl sm:text-2xl">Foire Aux Questions</CardTitle>
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Trouvez rapidement des réponses à vos questions
          </p>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              type="search"
              placeholder="Rechercher une question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          
          return (
            <Card
              key={category.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                isActive ? 'ring-2 shadow-md' : ''
              }`}
              style={isActive ? { background: '#e2001a' } : {}}
              onClick={() => setActiveCategory(category.id)}
            >
              <CardContent className="p-3 sm:p-4 text-center">
                <div 
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mx-auto mb-2 flex items-center justify-center"
                  style={isActive ? { background: '#e2001a' } : { background: '#f3f4f6' }}
                >
                  <Icon 
                    className="w-4 h-4 sm:w-5 sm:h-5" 
                    style={isActive ? { color: 'white' } : { color: '#6b7280' }}
                  />
                </div>
                <p className="text-xs sm:text-sm font-medium text-gray-900">{category.label}</p>
                <p className="text-xs text-gray-500 mt-1">{category.count}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* FAQ List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base sm:text-lg">
              {filteredFAQs.length} question{filteredFAQs.length > 1 ? 's' : ''} trouvée{filteredFAQs.length > 1 ? 's' : ''}
            </CardTitle>
            {searchQuery && (
              <Badge variant="outline" className="text-xs">
                Recherche: "{searchQuery}"
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <HelpCircle className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-sm sm:text-base text-gray-500">Aucune question trouvée</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-2">
                Essayez avec d'autres mots-clés ou parcourez les catégories
              </p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {filteredFAQs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-start gap-2 sm:gap-3 pr-2">
                      <HelpCircle 
                        className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" 
                        style={{ color: '#e2001a' }}
                      />
                      <div className="flex-1">
                        <p className="text-sm sm:text-base font-medium text-gray-900">
                          {faq.question}
                        </p>
                        <Badge 
                          variant="secondary" 
                          className={`mt-2 text-xs ${getCategoryColor(faq.category)}`}
                        >
                          {getCategoryLabel(faq.category)}
                        </Badge>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-7 sm:pl-8 pr-4 pt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card className="bg-gradient-to-br from-red-50 to-white border-red-100">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#e2001a' }}>
              <HelpCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1">
                Vous ne trouvez pas votre réponse ?
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Notre équipe de support est là pour vous aider. Contactez-nous à{' '}
                <a 
                  href="mailto:support@caisse-epargne.mg" 
                  className="font-medium hover:underline"
                  style={{ color: '#e2001a' }}
                >
                  support@caisse-epargne.mg
                </a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

FAQPage.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;

export default FAQPage;
