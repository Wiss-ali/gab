import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Eye } from "lucide-react";
import { ThemeToggle } from "./components/ThemeToggle";
import InvoiceForm from "./components/invoice-form/InvoiceForm";
import InvoicePDF from "./components/InvoicePDF";
import PDFPreview from "./components/PDFPreview";

function App() {
  const [formData, setFormData] = useState(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-xl mx-auto items-center justify-between px-4">
          <h1 className="text-xl font-bold">Générateur de Factures</h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="container max-w-screen-xl mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-muted-foreground">
            Créez et prévisualisez vos factures professionnelles
          </p>
        </div>

        {/* Mobile and Tablet View */}
        <div className="lg:hidden space-y-6">
          <Card className="shadow-md">
            <CardContent className="p-0">
              <ScrollArea className="h-[60vh]">
                <InvoiceForm onSubmit={setFormData} />
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="p-0">
              <div className="h-[60vh]">
                {formData ? (
                  <PDFPreview document={<InvoicePDF data={formData} />} />
                ) : (
                  <div className="h-full flex items-center justify-center bg-muted rounded-lg border-2 border-dashed">
                    <div className="text-center space-y-2 p-6">
                      <Eye className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Remplissez le formulaire pour voir l'aperçu
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8">
          <Card className="shadow-md">
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <InvoiceForm onSubmit={setFormData} />
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="p-0">
              <div className="h-[calc(100vh-12rem)]">
                {formData ? (
                  <PDFPreview document={<InvoicePDF data={formData} />} />
                ) : (
                  <div className="h-full flex items-center justify-center bg-muted rounded-lg border-2 border-dashed">
                    <div className="text-center space-y-2 p-6">
                      <Eye className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Remplissez le formulaire pour voir l'aperçu
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default App;