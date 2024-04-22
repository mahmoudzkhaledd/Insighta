
import { infos } from "@/constants/landing";
import { InfoLanding } from '../sections/info-landing'
import { HeaderSection } from "../sections/header-section";

export default function InfoSection() {
    return (
        <>
            <HeaderSection
                label="Why choose us?"
                title="Discover all features."
                subtitle="Experience seamless integration, powerful analytics, and tailored subscription plans. Focus on your project while we handle the insights for you."
            />
            {
                infos.map((e, idx) => <InfoLanding data={e} reverse={idx % 2 != 0} key={idx} />)
            }
        </>
    )
}
