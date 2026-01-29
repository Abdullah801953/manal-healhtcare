import TreatmentForm from "../../components/TreatmentForm";

export default async function EditTreatmentPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  return <TreatmentForm id={id} />;
}
