import { useEffect } from 'react';
import { Tooltip, Popover, Dropdown } from 'bootstrap';

export const useBootstrapUtils = (pathName: string) => {
  useEffect(() => {
    // Initialize tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = Array.from(tooltipTriggerList).map(
      (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
    );

    // Initialize popovers
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = Array.from(popoverTriggerList).map(
      (popoverTriggerEl) => new Popover(popoverTriggerEl)
    );

    // Initialize dropdowns
    const dropdownTriggerList = document.querySelectorAll('[data-bs-toggle="dropdown"]');
    const dropdownList = Array.from(dropdownTriggerList).map(
      (dropdownTriggerEl) => new Dropdown(dropdownTriggerEl)
    );

    // Handle dropdown hover on large screens
    const handleResize = () => {
      const newWindowWidth = window.innerWidth;
      if (newWindowWidth >= 1400) {
        document.querySelectorAll('.dropdown').forEach((e) => {
          const dropdown = e as HTMLElement;
          const dropdownMenu = dropdown.querySelector('.dropdown-menu') as HTMLElement;
          if (dropdownMenu) {
            const mouseOverHandler = () => {
              dropdownMenu.classList.add('show');
            };
            const mouseLeaveHandler = () => {
              dropdownMenu.classList.remove('show');
            };
            dropdown.addEventListener('mouseover', mouseOverHandler);
            dropdown.addEventListener('mouseleave', mouseLeaveHandler);
          }
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      // Cleanup tooltips
      tooltipList.forEach((tooltip) => tooltip.dispose());
      // Cleanup popovers
      popoverList.forEach((popover) => popover.dispose());
      // Cleanup dropdowns
      dropdownList.forEach((dropdown) => dropdown.dispose());
      window.removeEventListener('resize', handleResize);
    };
  }, [pathName]);
};

