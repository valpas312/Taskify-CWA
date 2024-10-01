import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed z-50 top-0 w-full px-4 h-14 border-b shadow-sm bg-white flex items-center">
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <Button size="sm" className="rounded-sm hidden md:block h-auto py-1.5 px-2">
            Create Organization
        </Button>
        <Button size="sm" className="rounded-sm block md:hidden">
            <Plus size={16} />
        </Button>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher
            hidePersonal
            afterSelectOrganizationUrl="/organization/:id"
            afterCreateOrganizationUrl="/organization/:id"
            afterLeaveOrganizationUrl="/select-org"
            appearance={{
                elements: {
                    rootBox: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }
                }
            }}
        />
        <UserButton
            afterSignOutUrl="/"
            appearance={{
                elements: {
                    avatarBox: {
                        height: 30,
                        width: 30,
                    }
                }
            }}
        />
      </div>
    </nav>
  );
}
