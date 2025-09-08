import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import drugsData from "../data/drugs.json";

/**
 * DrugInfoDialog component
 * @param {Object} props
 * @param {string[]} drugs - List of drug names
 * @param {string} patientName - Patient name for context
 */
const DrugInfoDialog = ({ drugs = [], patientName }) => {
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (drug) => {
    setSelectedDrug(drug);
    setOpen(true);
  };

  const drugObj = selectedDrug
    ? drugsData.find((d) => d.name === selectedDrug)
    : null;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {drugs.map((drug) => (
        <Dialog key={drug} open={open && selectedDrug === drug} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              className="bg-secondary text-secondary-foreground rounded px-3 py-1 text-sm hover:bg-primary/10 transition border"
              onClick={() => handleOpen(drug)}
              aria-label={`نمایش اطلاعات داروی ${drug}`}
            >
              {drug}
            </button>
          </DialogTrigger>
          <DialogContent className="rtl text-right max-w-md">
            <DialogHeader>
              <DialogTitle>اطلاعات دارو: {drug}</DialogTitle>
            </DialogHeader>
            {drugObj ? (
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">موارد مصرف:</span> {drugObj.indication}
                </div>
                <div>
                  <span className="font-semibold">عوارض جانبی:</span> {drugObj.sideEffects.join("، ")}
                </div>
                <div>
                  <span className="font-semibold">موارد منع مصرف:</span> {drugObj.contraindications.join("، ")}
                </div>
                {patientName && (
                  <div className="text-xs text-gray-500 mt-2">
                    <span>عوارض احتمالی برای {patientName} بر اساس سوابق پزشکی:</span>
                    <ul className="list-disc pr-5">
                      {drugObj.sideEffects.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-red-500">اطلاعاتی یافت نشد.</div>
            )}
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default DrugInfoDialog;
