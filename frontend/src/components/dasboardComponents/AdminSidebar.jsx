import { useState, useEffect } from 'react';
import { LayoutDashboard, ScanLine, LayoutList, Users, PenSquare, Pen } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import {Menu} from 'lucide-react'
const menuItems = [
  { id: 'dashboard', label: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={30} /> },
  { id: 'products', label: 'All Products', path: '/admin/products', icon: <ScanLine size={30} /> },
  { id: 'createproduct', label: 'Create Product', path: '/admin/createproduct', icon: <Pen size={30} /> },
  { id: 'orders', label: 'Orders', path: '/admin/orders', icon: <LayoutList size={30} /> },
  { id: 'users', label: 'Users', path: '/admin/users', icon: <Users size={30} /> },
  { id: 'reviews', label: 'Reviews', path: '/admin/reviews', icon: <PenSquare size={30} /> },
];

const AdminSidebar = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Update active menu based on the current location path
    const currentPath = location.pathname;
    const matchedMenu = menuItems.find(item => currentPath === item.path);
    if (matchedMenu) {
      setActiveMenu(matchedMenu.id);
    }
  }, [location.pathname]);
  

  const toggleMenu = (menuId, path) => {
    setActiveMenu(menuId);
    navigate(path);
  };

  return (
    <aside className="h-full relative max-md:hidden w-1/5 bg-white/60 backdrop-blur-sm rounded-lg min-h-[85svh] text-black px-4">
      <nav className='flex flex-col gap-6 py-10'>

        {menuItems.map(({ id, label, path, icon }) => (
          <div 
            key={id}
            onClick={() => toggleMenu(id, path)}
            className={`flex gap-6 text-slate-700 rounded-lg items-center cursor-pointer px-2 py-3 hover:bg-violet-500 hover:text-white ${activeMenu === id && 'bg-violet-500 text-white'}`}
          >
            {icon} {label}
          </div>
        ))}
      </nav>
      <div className='hidden max-md:visible absolute text-blue-400'><Menu/></div>
    </aside>
  );
};

export default AdminSidebar;
