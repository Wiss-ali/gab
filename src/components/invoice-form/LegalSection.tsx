import { Field } from "formik";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function LegalSection() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="legalText">Texte légal</Label>
          <Field
            as={Textarea}
            id="legalText"
            name="legalText"
            rows={3}
            placeholder="Mentions légales obligatoires"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="bankDetails">Informations bancaires</Label>
          <Field
            as={Textarea}
            id="bankDetails"
            name="bankDetails"
            rows={4}
            placeholder="Coordonnées bancaires"
          />
        </div>
      </div>
    </div>
  );
}