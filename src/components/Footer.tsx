export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="container-narrow py-6 text-sm text-neutral-600 flex flex-col md:flex-row gap-2 md:gap-6 items-center justify-between">
        <div>© {new Date().getFullYear()} Sahara • Morocco</div>
        <div className="opacity-80">
          ألوان: الأحمر والأخضر ورمال الصحراء • تصميم حديث وسريع
        </div>
      </div>
    </footer>
  );
}
