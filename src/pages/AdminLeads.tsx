import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, 
  Mail, 
  Phone, 
  Calendar, 
  Download,
  ArrowLeft,
  Eye,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface LeadCapture {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  child_name: string;
  child_age: number;
  level_interest: string;
  created_at: string;
}

interface ContactSubmission {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  privacy_accepted: boolean;
  created_at: string;
}

const AdminLeads = () => {
  const { adminSession, isLoading } = useAdminAuth();
  const [leads, setLeads] = useState<LeadCapture[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [activeTab, setActiveTab] = useState<'leads' | 'contacts'>('leads');

  useEffect(() => {
    if (adminSession) {
      fetchData();
    }
  }, [adminSession]);

  const fetchData = async () => {
    try {
      setLoadingData(true);
      
      // Fetch lead captures
      const { data: leadsData, error: leadsError } = await supabase
        .from('lead_captures')
        .select('*')
        .order('created_at', { ascending: false });

      if (leadsError) throw leadsError;

      // Fetch contact submissions
      const { data: contactsData, error: contactsError } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (contactsError) throw contactsError;

      setLeads(leadsData || []);
      setContacts(contactsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
  };

  if (isLoading || loadingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-casa-blue mx-auto" />
          <p className="mt-4 text-gray-600">Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-display font-bold text-casa-blue">
                  Gestion des Leads
                </h1>
                <p className="text-gray-600">
                  Leads de contact et candidatures d'admission
                </p>
              </div>
            </div>
            <Link to="/" target="_blank">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Voir le site
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Candidatures</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leads.length}</div>
              <p className="text-xs text-muted-foreground">
                Demandes d'admission
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contacts</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contacts.length}</div>
              <p className="text-xs text-muted-foreground">
                Messages reçus
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cette semaine</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {leads.filter(lead => 
                  new Date(lead.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                ).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Nouveaux leads
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Téléphone</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {leads.filter(lead => lead.phone).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Numéros fournis
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('leads')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'leads'
                    ? 'border-casa-blue text-casa-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Candidatures ({leads.length})
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'contacts'
                    ? 'border-casa-blue text-casa-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Messages de contact ({contacts.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                {activeTab === 'leads' ? 'Demandes d\'admission' : 'Messages de contact'}
              </h3>
              <Button
                onClick={() => 
                  exportToCSV(
                    activeTab === 'leads' ? leads : contacts, 
                    activeTab === 'leads' ? 'candidatures' : 'contacts'
                  )
                }
                variant="outline"
              >
                <Download className="h-4 w-4 mr-2" />
                Exporter CSV
              </Button>
            </div>

            {activeTab === 'leads' ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Parent</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Enfant</TableHead>
                    <TableHead>Âge</TableHead>
                    <TableHead>Niveau</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        {format(new Date(lead.created_at), 'dd/MM/yyyy HH:mm', { locale: fr })}
                      </TableCell>
                      <TableCell className="font-medium">{lead.full_name}</TableCell>
                      <TableCell>
                        <a href={`mailto:${lead.email}`} className="text-casa-blue hover:underline">
                          {lead.email}
                        </a>
                      </TableCell>
                      <TableCell>
                        <a href={`tel:${lead.phone}`} className="text-casa-blue hover:underline">
                          {lead.phone}
                        </a>
                      </TableCell>
                      <TableCell>{lead.child_name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{lead.child_age} ans</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{lead.level_interest}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Sujet</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell>
                        {format(new Date(contact.created_at), 'dd/MM/yyyy HH:mm', { locale: fr })}
                      </TableCell>
                      <TableCell className="font-medium">{contact.full_name}</TableCell>
                      <TableCell>
                        <a href={`mailto:${contact.email}`} className="text-casa-blue hover:underline">
                          {contact.email}
                        </a>
                      </TableCell>
                      <TableCell>
                        <a href={`tel:${contact.phone}`} className="text-casa-blue hover:underline">
                          {contact.phone}
                        </a>
                      </TableCell>
                      <TableCell>{contact.subject}</TableCell>
                      <TableCell className="max-w-xs truncate" title={contact.message}>
                        {contact.message}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLeads;