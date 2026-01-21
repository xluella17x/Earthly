type NavItemProps = {
    label: string;
    id: string;
}

function NavItem({ label, id }: NavItemProps) {
  return (
    <a href={id}>
      <div>{label}</div>
    </a>
  )
}

export default NavItem
