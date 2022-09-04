import { ReactNode } from 'react'
import Header from './Header'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => (
  <div>
    <div>
      <Header />
      <main>{children}</main>
    </div>
  </div>
)

export default Layout
