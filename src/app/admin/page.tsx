import { Metadata } from "next";
import { AdminClient } from "@/components/admin/AdminClient";

export const metadata: Metadata = {
  title: "Painel Admin — SeekMedia",
  description: "Área restrita da SeekMedia.",
};

export default function AdminPage() {
  return <AdminClient />;
}
