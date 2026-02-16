export default function Footer() {
  return (
    <footer className="border-t border-[#1F2937] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm text-[#9CA3AF]">
            © 2026 Medware Solutions. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm text-[#9CA3AF]">
            <a href="#work" className="hover:text-[#F9FAFB] transition-colors">Products</a>
            <a href="https://framewright.site" target="_blank" rel="noopener noreferrer" className="hover:text-[#F9FAFB] transition-colors">
              Framewright
            </a>
            <a href="https://github.com/medwaresolutions" target="_blank" rel="noopener noreferrer" className="hover:text-[#F9FAFB] transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
