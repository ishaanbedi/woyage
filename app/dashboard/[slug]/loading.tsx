import { LoaderCircle } from "lucide-react";
const Loading = async () => {
  return (
    <section className="container mx-auto p-4 min-h-[92vh]">
      <div className="flex justify-center items-center min-h-[80vh]">
        <LoaderCircle className="animate-spin" />
      </div>
    </section>
  );
};

export default Loading;
