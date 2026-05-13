import { WisdomExperience } from '@/components/wisdom-experience';
import { requireLanguage } from '@/lib/i18n';

export default function LanguagePillarsPage({ params }: { params: { lang: string } }) {
  return <WisdomExperience focus="pillars" initialLanguage={requireLanguage(params.lang)} />;
}
