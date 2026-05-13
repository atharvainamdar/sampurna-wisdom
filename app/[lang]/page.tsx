import { WisdomExperience } from '@/components/wisdom-experience';
import { requireLanguage } from '@/lib/i18n';

export default function LanguageHomePage({ params }: { params: { lang: string } }) {
  return <WisdomExperience focus="today" initialLanguage={requireLanguage(params.lang)} />;
}
