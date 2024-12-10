"use client";

import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import type { AppointmentsT } from "./appointment-card";

export default function GeneratePDFButton({ item }: { item: AppointmentsT }) {
  console.log("Price", item.service_id);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);

    doc.text(`Appointment ID: ${item.id}`, 10, 10);
    doc.text(`Resident: ${item.resident_id.name}`, 10, 20);
    doc.text(`Service: ${item.service_id.name}`, 10, 30);
    doc.text(`Amount: ${item.service_id.price}`, 10, 40);
    doc.text(`Payment Method: ${item.payment_method}`, 10, 50);
    doc.text(`Date: ${new Date(item.date).toDateString()}`, 10, 60);
    doc.text(`Status: ${item.status}`, 10, 70);

    // Save the PDF
    doc.save("appointment.pdf");
  };
  return (
    <Button size="sm" onClick={generatePDF}>
      Save Receipt
    </Button>
  );
}
