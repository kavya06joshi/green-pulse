import HeroBanner from "@/components/dashboard/HeroBanner";
import StatsGrid from "@/components/dashboard/StatsGrid";
import AnnouncementsList from "@/components/dashboard/AnnouncementsList";
import ProgressSection from "@/components/dashboard/ProgressSection";
import ComplaintForm from "@/components/dashboard/ComplaintForm";
import ComplaintList from "@/components/dashboard/ComplaintList";
import EcoCity360Banner from "@/components/dashboard/EcoCity360Banner";
import { useAuth } from "../context/AuthContext";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8 space-y-6">
      <HeroBanner />
      
      {!user ? (
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <StatsGrid />
          </div>
          <div className="space-y-6">
            <AnnouncementsList />
            <ProgressSection />
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <ComplaintForm />
            <StatsGrid />
          </div>
          <div className="space-y-6 border-l pl-0 lg:pl-8">
            <ComplaintList />
            <AnnouncementsList />
          </div>
        </div>
      )}

      <EcoCity360Banner />
    </div>
  );
};

export default Index;
