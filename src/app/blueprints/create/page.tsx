import { getMCPServers } from "@/actions/server.actions";
import CreateBlueprintForm from "@/components/ui/CreateBlueprintForm";

export default async function CreateBlueprintPage() {
  const { servers } = await getMCPServers({});

  return (
    <div className="max-w-3xl mx-auto py-12 mt-24">
      <h1 className="text-3xl font-bold mb-8 text-center">Create a Blueprint</h1>
      <CreateBlueprintForm servers={servers} />
    </div>
  );
} 