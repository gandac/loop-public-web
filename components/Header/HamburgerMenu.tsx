export default function HamburgerMenu({ onClick }: { onClick: () => void }) {
  return (
    <div className="block lg:hidden">
      <button
        type="button"
        className="flex items-center px-3 py-2 border rounded text-dark-400
         border-gray-950 hover:text-gray-600 hover:border-gray-600"
        onClick={onClick}
      >
        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
  );
}
