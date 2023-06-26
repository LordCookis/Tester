import NavBar from "@/components/NavBar"

export default function Layout({children}) {
  return(
    <>
      <NavBar/>
      {children}
    </>
  )
}