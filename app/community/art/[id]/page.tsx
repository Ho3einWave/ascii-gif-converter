import React from "react";
import ArtDetailPage from "../../../../components/community/art-details";
import { getArtById } from "@/services/api/getArtById";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
    const { id } = await params;
    const art = await getArtById(id);
    if (!art.success) {
        return notFound();
    }
    return <ArtDetailPage artInitialData={art.data} />;
};

export default Page;
