export default function Footer(): JSX.Element {
  const startYear = 2023;
  const currentYear = new Date().getFullYear();
  return (
    <div className="mt-5">
      <hr className="border-primary-content" />
      <span
        id="footer"
        className="text-xs text-primary-content"
      >
        Copyright &copy;
        {currentYear > startYear ? `${startYear}-${currentYear}` : startYear} Collin Bachman, a.k.a BachMacintosh
        <br />
        Version {process.env.version}
      </span>
    </div>
  );
}
