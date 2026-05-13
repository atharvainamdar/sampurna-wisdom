import { WisdomExperience } from '@/components/wisdom-experience';
import { requireLanguage } from '@/lib/i18n';

export default function LanguageLibraryPage({ params }: { params: { lang: string } }) {
  return <WisdomExperience focus="library" initialLanguage={requireLanguage(params.lang)} />;
}
