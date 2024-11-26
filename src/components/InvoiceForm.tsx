import { Formik, Form, Field } from "formik";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download } from "lucide-react";
import { getMonthName } from "@/lib/date-utils";
import InvoicePDF from "./InvoicePDF";

const DEFAULT_LEGAL_TEXT =
  "Nous nous réservons la propriété des matériels et fournitures jusqu'au paiement comptant par l'acheteur (loi n°80 335 du 12 mai 1980)";
const DEFAULT_BANK_DETAILS =
  "Banque GGGGGGG - Titulaire du compte : SCI TORI IBAN FR 76 0000 0000 0000 0000 0000 000 BIC : 1234567 Société par actions simplifiée (SAS) - Capital de 20 000 € - SIRET: 1234567 NAF-APE: 0000Z - Numéro TVA: 12345678";

const tvaOptions = [5.5, 10, 20];
const qteOptions = Array.from({ length: 10 }, (_, i) => i + 1);
const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);

export default function InvoiceForm({ onSubmit }) {
  const handleSubmit = (values) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    onSubmit({
      ...values,
      factureNumber: `2024-${values.month}`,
      dateFacturation: today.toISOString().split("T")[0],
      dateEcheance: tomorrow.toISOString().split("T")[0],
      designation: values.designation,
      legalText: values.legalText || DEFAULT_LEGAL_TEXT,
      bankDetails: values.bankDetails || DEFAULT_BANK_DETAILS,
    });
  };

  return (
    <div className="p-6">
      <Formik
        initialValues={{
          month: new Date().getMonth() + 1,
          designation: "LOYER MENSUEL LOCAL",
          tva: 5.5,
          prix: 1000,
          quantite: 1,
          legalText: DEFAULT_LEGAL_TEXT,
          bankDetails: DEFAULT_BANK_DETAILS,
        }}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Période</h3>
              <div className="grid gap-2">
                <Label htmlFor="month">Mois de facturation</Label>
                <Select
                  value={values.month.toString()}
                  onValueChange={(value) => setFieldValue("month", parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un mois" />
                  </SelectTrigger>
                  <SelectContent>
                    {monthOptions.map((month) => (
                      <SelectItem key={month} value={month.toString()}>
                        {getMonthName(month)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Rest of the form remains the same */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Détails de la facture</h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="designation">Désignation</Label>
                  <Field
                    as={Input}
                    id="designation"
                    name="designation"
                    placeholder="Description de la prestation"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="tva">TVA (%)</Label>
                    <Select
                      value={values.tva.toString()}
                      onValueChange={(value) => setFieldValue("tva", parseFloat(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Taux de TVA" />
                      </SelectTrigger>
                      <SelectContent>
                        {tvaOptions.map((rate) => (
                          <SelectItem key={rate} value={rate.toString()}>
                            {rate}%
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="prix">Prix HT</Label>
                    <Field
                      as={Input}
                      type="number"
                      id="prix"
                      name="prix"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="quantite">Quantité</Label>
                  <Select
                    value={values.quantite.toString()}
                    onValueChange={(value) => setFieldValue("quantite", parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une quantité" />
                    </SelectTrigger>
                    <SelectContent>
                      {qteOptions.map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Informations légales</h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="legalText">Texte légal</Label>
                  <Field
                    as={Textarea}
                    id="legalText"
                    name="legalText"
                    rows={2}
                    placeholder="Mentions légales obligatoires"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="bankDetails">Informations bancaires</Label>
                  <Field
                    as={Textarea}
                    id="bankDetails"
                    name="bankDetails"
                    rows={3}
                    placeholder="Coordonnées bancaires"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                Générer la facture
              </Button>
              
              {onSubmit.formData && (
                <PDFDownloadLink
                  document={<InvoicePDF data={onSubmit.formData} />}
                  fileName="facture.pdf"
                >
                  {({ loading }) => (
                    <Button variant="secondary" disabled={loading} className="flex gap-2">
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