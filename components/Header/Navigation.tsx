import { type PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

const filterLiveStatus = ({ properties }: PageObjectResponse) => properties.Status.type === 'status' && properties.Status?.status?.name === 'Live';
const filterUnwantedPages = ({ properties }: PageObjectResponse) => {
  if (properties.pageId?.type === "rich_text") {
    return !['home', 'resources'].includes(properties.pageId?.rich_text?.[0]?.plain_text)
  }
}

export default function Navigation({ allPages, className }: { allPages: PageObjectResponse[], className: string }) {
  const navigationItems = allPages
    .filter(args => 'properties' in args)
    .filter(filterLiveStatus)
    .filter(filterUnwantedPages)
    .map(({ properties }) => {
      if (properties.pageId.type === "rich_text" && properties.Title.type === 'title')
        return (
          <a
            href={`/${properties.pageId?.rich_text?.[0]?.plain_text}`}
            key={properties.pageId?.rich_text?.[0]?.plain_text}
            className="block mt-4 lg:inline-block lg:mt-0 text-indigo-950 hover:text-gray-600 mr-4"
          >
            {properties.Title?.title?.[0]?.type === "text" && properties.Title?.title?.[0]?.text?.content}
          </a>
        )
    });

  return (
    <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${className}`}>
      <div className="text-sm lg:flex-grow">{navigationItems}</div>
      <div>
        <a
          href="/contact"
          className="inline-block text-sm px-4 py-2 leading-none rounded bg-indigo-700 text-white border-white hover:border-transparent hover:bg-indigo-900 mt-4 lg:mt-0"
        >
          Contact us
        </a>
      </div>
    </div>
  );
}
