import { bannerImageOne, bannerImageThree, bannerImageTwo } from "./constant";
import { FaBoxOpen, FaHome, FaStore, FaThList } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

export const bannerLists = [
  {
    id: 1,
    image: bannerImageOne,
    title: "Home Comfort",
    subtitle: "Living Room",
    description: "Upgrade your space with cozy and stylish sofas",
  },
  {
    id: 2,
    image: bannerImageTwo,
    title: "Entertainment Hub",
    subtitle: "Smart TV",
    description: "Experience the latest in home entertainment",
  },
  {
    id: 3,
    image: bannerImageThree,
    title: "Playful Picks",
    subtitle: "Kids' Clothing",
    description: "Bright and fun styles for kids, up to 20% off",
  },
];

export const adminNavigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: FaHome,
    current: true,
  },

  {
    name: "Orders",
    href: "/admin/orders",
    icon: FaShoppingCart,
  },

  {
    name: "Products",
    href: "/admin/products",
    icon: FaBoxOpen,
  },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: FaThList,
  },
  {
    name: "Sellers",
    href: "/admin/sellers",
    icon: FaStore,
  },
];

export const sellerNavigation = [
  {
    name: "Orders",
    href: "/admin/orders",
    icon: FaShoppingCart,
    current: true,
  },

  {
    name: "Products",
    href: "/admin/products",
    icon: FaBoxOpen,
  },
];

const normalizeRoleValue = (role) => {
  if (!role) return null;

  if (typeof role === "string") {
    const trimmedRole = role.trim().toUpperCase();
    return trimmedRole.startsWith("ROLE_")
      ? trimmedRole
      : `ROLE_${trimmedRole}`;
  }

  if (typeof role === "object") {
    const roleName = role.roleName || role.name || role.authority;
    return normalizeRoleValue(roleName);
  }

  return null;
};

export const getUserRoles = (user) => {
  if (!user) return [];

  const sourceRoles =
    user.roles || user.role || user.authorities || user.response?.roles || [];
  const roles = Array.isArray(sourceRoles) ? sourceRoles : [sourceRoles];

  return roles.map(normalizeRoleValue).filter(Boolean);
};

export const hasRole = (user, role) => {
  const normalizedRole = normalizeRoleValue(role);

  if (!normalizedRole) return false;
  return getUserRoles(user).includes(normalizedRole);
};
