import Banner from "../components/homeComponents/Banner";
import HomeCommunityChallange from "../components/homeComponents/HomeCommunityChallange";
import HomeCommunityStories from "../components/homeComponents/HomeCommunityStories";
import HomeDownloadApp from "../components/homeComponents/HomeDownloadApp";
import HomeGeneralInquires from "../components/homeComponents/HomeGeneralInquires";
import HomeGoal from "../components/homeComponents/HomeGoal";
import HomeMobileApp from "../components/homeComponents/HomeMobileApp";
import HomePlan from "../components/homeComponents/HomePlan";
import HomeSecurityTrust from "../components/homeComponents/HomeSecurityTrust";
import HowItWorksPage from "../components/homeComponents/HowItWorksPage";


export default function Home() {
  return (
    <div>
      <Banner />
      <HowItWorksPage />
      <HomePlan />
      <HomeGoal />
      <HomeCommunityChallange />
      <HomeMobileApp />
      <HomeSecurityTrust />
      <HomeCommunityStories />
      <HomeGeneralInquires />
      <HomeDownloadApp />
    </div>
  );
}
