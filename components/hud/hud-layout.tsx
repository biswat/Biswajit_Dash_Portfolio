import { ClientInfoProvider } from "./client-info-provider"
import {
  HudBottomRail,
  HudLeftRail,
  HudRightRail,
  HudTopRail,
} from "./hud-rails"

/**
 * Telemetry chrome around the page. Rails are fixed, so content is padded to
 * clear them: 8px bars top/bottom always, 176px side rails from lg up.
 */
export function HudLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientInfoProvider>
      <HudTopRail />
      <HudLeftRail />
      <HudRightRail />
      <main className="min-h-svh pt-8 pb-8 lg:px-44">{children}</main>
      <HudBottomRail />
    </ClientInfoProvider>
  )
}
