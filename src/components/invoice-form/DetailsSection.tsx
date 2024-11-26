import { Field } from "formik";
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

const tvaOptions = [5.5, 10, 20];
const qteOptions = Array.from({ length: 10 }, (_, i) => i + 1);

export default function DetailsSection({ values, setFieldValue }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="designation">Désignation</Label>
          <Field
            as={Textarea}
            id="designation"
            name="designation"
            placeholder="Description de la prestation"
            className="min-h-[100px] resize-y"
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

        <div className="grid gap-2">
          <Label htmlFor="paymentTerms">Conditions de règlement</Label>
          <Field
            as={Input}
            id="paymentTerms"
            name="paymentTerms"
            placeholder="À réception"
          />
        </div>
      </div>
    </div>
  );
}