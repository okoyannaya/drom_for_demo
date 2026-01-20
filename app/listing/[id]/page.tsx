import ListingPageClient from './ListingPageClient'

export function generateStaticParams() {
  // Генерируем статические параметры для предварительного рендеринга
  // Для примера создаем один статический ID
  return [
    { id: '627037398' }
  ]
}

export default function ListingPage() {
  return <ListingPageClient />
}



