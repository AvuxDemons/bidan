import {
  extendVariants,
  Select as HeroUISelect,
  Input as HeroUIInput,
  NumberInput as HeroUINumberInput,
  Button as HeroUIButton,
  Chip as HeroUIChip,
  Table as HeroUITable,
  Modal as HeroUIModal,
  Drawer as HeroUIDrawer,
  Autocomplete as HeroUIAutocomplete,
  Pagination as HeroUIPagination,
  Skeleton as HeroUISkeleton,
} from "@heroui/react";

const Skeleton = extendVariants(HeroUISkeleton, {
  variants: {
    variant: {
      default: {
        base: "rounded",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const Drawer = extendVariants(HeroUIDrawer, {
  variants: {
    backdrop: {
      opaque: {
        backdrop: "bg-black/80",
      },
    },
  },
  defaultVariants: {
    backdrop: "opaque",
  },
});

const Modal = extendVariants(HeroUIModal, {
  variants: {
    backdrop: {
      opaque: {
        backdrop: "bg-black/80",
      },
    },
  },
  defaultVariants: {
    backdrop: "opaque",
  },
});

const Table = extendVariants(HeroUITable, {
  variants: {
    color: {
      primary: {
        th: "bg-primary text-white",
      },
    },
  },
  defaultVariants: {
    radius: "sm",
  },
});

const NumberInput = extendVariants(HeroUINumberInput, {
  variants: {},
  defaultVariants: {
    variant: "bordered",
    color: "primary",
    labelPlacement: "outside",
    placeholder: " ",
    radius: "sm",
    step: "any",
    minValue: 0,
  },
});

const Input = extendVariants(HeroUIInput, {
  variants: {},
  defaultVariants: {
    variant: "bordered",
    color: "primary",
    labelPlacement: "outside",
    placeholder: " ",
    radius: "sm",
    step: "any",
  },
});

const Select = extendVariants(HeroUISelect, {
  variants: {
    size: {
      xs: {
        base: "h-[28px]",
        innerWrapper: "py-0.5",
        value: "text-sm",
      },
    },
  },
  defaultVariants: {
    variant: "bordered",
    color: "primary",
    labelPlacement: "outside",
    placeholder: " ",
    radius: "sm",
  },
});

const Autocomplete = extendVariants(HeroUIAutocomplete, {
  variants: {},
  defaultVariants: {
    variant: "bordered",
    labelPlacement: "outside",
    placeholder: " ",
    radius: "sm",
  },
});

const Button = extendVariants(HeroUIButton, {
  variants: {
    merge: {
      left: "rounded-l-none",
      middle: "rounded-none",
      right: "rounded-r-none",
    },
    color: {
      primary: "text-white",
      danger: "text-white",
    },
    variant: {
      bordered: "text-primary border-primary",
    },
  },
  defaultVariants: {
    variant: "solid",
    radius: "sm",
  },
});

const Pagination = extendVariants(HeroUIPagination, {
  variants: {
    color: {
      primary: {
        item: "bg-default-50",
        next: "bg-default-50",
        prev: "bg-default-50",
        cursor: "text-white",
      },
    },
  },
  defaultVariants: {
    isCompact: "true",
    variant: "flat",
    color: "primary",
    radius: "sm",
    size: "sm",
  },
});

const Chip = extendVariants(HeroUIChip, {
  variants: {
    type: {
      soon: {
        base: "bg-red-500 text-white",
      },
      popular: {
        base: "bg-blue-500 text-white",
      },
      ready: {
        base: "bg-green-500 text-white",
      },
      size: {
        base: "uppercase",
      },
    },
    payment: {
      paid: {
        base: "bg-success text-white",
        content: "uppercase font-semibold tracking-wide",
      },
      pending: {
        base: "bg-yellow-500 text-white",
        content: "uppercase font-semibold tracking-wide",
      },
      unpaid: {
        base: "bg-danger text-white",
        content: "uppercase font-semibold tracking-wide",
      },
    },
    gender: {
      female: {
        base: "text-primary border-primary",
      },
      male: {
        base: "text-blue-500 border-blue-500",
      },
      unisex: {
        base: "text-gray-500 border-gray-500",
      },
    },
    bundle: {
      yes: {
        base: "border-green-500 text-green-500",
      },
    },
    variant: {
      bordered: {
        base: "border-[1px]",
      },
      shadow: {
        base: "shadow-black/20",
      },
    },
    radius: {
      custom: {
        base: "rounded-[5px]",
      },
    },
    size: {
      xs: {
        base: "text-[0.65rem] md:text-[0.7rem] px-2 py-0",
      },
      xss: {
        base: "text-[0.6rem] md:text-[0.65rem] px-2 py-0",
      },
    },
    color: {
      danger: {
        base: "text-white",
      },
    },
    merge: {
      left: {
        base: "rounded-l-none",
      },
      middle: {
        base: "rounded-none border-x-0",
      },
      right: {
        base: "rounded-r-none",
      },
    },
  },
  defaultVariants: {
    size: "sm",
    radius: "custom",
  },
});

export {
  Skeleton,
  Drawer,
  Modal,
  Table,
  Input,
  NumberInput,
  Pagination,
  Select,
  Autocomplete,
  Button,
  Chip,
};
