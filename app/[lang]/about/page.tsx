import { WisdomExperience } from '@/components/wisdom-experience';
import { requireLanguage } from '@/lib/i18n';

export default function LanguageAboutPage({ params }: { params: { lang: string } }) {
  return <WisdomExperience focus="about" initialLanguage={requireLanguage(params.lang)} />;
}
