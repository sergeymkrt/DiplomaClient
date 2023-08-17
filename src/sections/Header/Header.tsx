import GitHubIcon from '@mui/icons-material/GitHub';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';

import { repository, title } from '@/config';
import useSidebar from '@/store/sidebar';

import { useNavigate } from 'react-router-dom';
import { ModeToggle } from '@/components/Theme/mode-toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

function Header() {
  const [, sidebarActions] = useSidebar();
  const navigate = useNavigate();

  function showNotification() {
    navigate('/');
  }

  return (
    <header className="bg-background border border-t-0 border-x-0 py-4 px-6 flex justify-between items-center">
      {/*Left section*/}
      <div className="flex items-center">
        {/*Sidebar button*/}
        <button
          className="text-primary text-xl mr-4 focus:outline-none hover:text-primary-foreground transition-colors duration-300"
          onClick={sidebarActions.toggle}
          aria-label="menu"
        >
          <MenuIcon />
        </button>

        {/*Title button*/}
        <button
          className="text-primary font-semibold text-lg focus:outline-none hover:text-primary hover:shadow-md px-4 py-2 rounded-lg"
          onClick={showNotification}
        >
          {title}
        </button>
      </div>

      {/*right section*/}
      <div className="flex items-center justify-center">
        <a
          className="text-primary text-xl mr-4 focus:outline-none"
          href={repository}
          target="_blank"
          rel="noreferrer"
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <GitHubIcon />
              </TooltipTrigger>
              <TooltipContent>
                <p>It&apos;s open source</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </a>
        <button
          className="text-primary font-medium text-sm mr-4 focus:outline-none hover:underline"
          // onClick={loginActions.toggle}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <LoginIcon />
              </TooltipTrigger>
              <TooltipContent>
                <p>Open Login dialog</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </button>
        <ModeToggle />
      </div>
    </header>
  );
}

export default Header;
