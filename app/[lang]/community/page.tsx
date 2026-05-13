import { WisdomExperience } from '@/components/wisdom-experience';
import { requireLanguage } from '@/lib/i18n';

export default function LanguageCommunityPage({ params }: { params: { lang: string } }) {
  return <WisdomExperience focus="community" initialLanguage={requireLanguage(params.lang)} />;
}
