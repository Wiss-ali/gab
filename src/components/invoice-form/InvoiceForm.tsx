import { Formik, Form } from "formik";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InvoicePDF from "../InvoicePDF";
import PeriodSection from "./PeriodSection";
import DetailsSection from "./DetailsSection";
import LegalSection from "./LegalSection";

const DEFAULT_LEGAL_TEXT =
  "Nous nous réservons la propriété des matériels et fournitures jusqu'au paiement comptant par l'acheteur (loi n°80 335 du 12 mai 1980)";
const DEFAULT_BANK_DETAILS =
  "Banque GGGGGGG - Titulaire du compte : SCI TORI IBAN FR 76 0000 0000 0000 0000 0000 000 BIC : 1234567 Société par actions simplifiée (SAS) - Capital de 20 000 € - SIRET: 1234567 NAF-APE: 0000Z - Numéro TVA: 12345678";

export default function InvoiceForm({ onSubmit }) {
  const today = new Date();

  const handleSubmit = (values) => {
    onSubmit({
      ...values,
      factureNumber: `2024-${values.month}`,
      designation: values.designation,
      legalText: values.legalText || DEFAULT_LEGAL_TEXT,
      bankDetails: values.bankDetails || DEFAULT_BANK_DETAILS,
    });
  };

  return (
    <div className="p-6">
      <Formik
        initialValues={{
          month: today.getMonth() + 1,
          dateFacturation: today.toISOString().split("T")[0],
          dateEcheance: new Date(today.setDate(today.getDate() + 1))
            .toISOString()
            .split("T")[0],
          designation: "LOYER MENSUEL LOCAL",
          tva: 5.5,
          prix: 1000,
          quantite: 1,
          paymentTerms: "À réception",
          legalText: DEFAULT_LEGAL_TEXT,
          bankDetails: DEFAULT_BANK_DETAILS,
        }}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-6">
            <Tabs defaultValue="period" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="period">Période</TabsTrigger>
                <TabsTrigger value="details">Détails</TabsTrigger>
                <TabsTrigger value="legal">Informations</TabsTrigger>
              </TabsList>

              <div className="mt-4">
                <TabsContent value="period">
                  <PeriodSection values={values} setFieldValue={setFieldValue} />
                </TabsContent>

                <TabsContent value="details">
                  <DetailsSection values={values} setFieldValue={setFieldValue} />
                </TabsContent>

                <TabsContent value="legal">
                  <LegalSection />
                </TabsContent>
              </div>
            </Tabs>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                Générer la facture
              </Button>

              {onSubmit.formData && (
                <PDFDownloadLink
                  document={<InvoicePDF data={onSubmit.formData} />}
                  fileName="facture.pdf"
                >
                  {({ loading }) => (
                    <Button
                      variant="secondary"
                      disabled={loading}
                      className="flex gap-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>Télécharger PDF</span>
                    </Button>
                  )}
                </PDFDownloadLink>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}