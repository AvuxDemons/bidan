import {
  extendVariants,
  Select as HeroUISelect,
  Input as HeroUIInput,
  NumberInput as HeroUINumberInput,
  Button as HeroUIButton,
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

const InputError = ({ error }: { error: any[] }) => {
  return error.length > 1 ? (
    <div className="text-xs">
      <ul className="list-disc pl-2.5">
        {error.map((err, index) => (
          <li key={index}>
            <span>{err.message}</span>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    error[0].message
  );
};

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
      success: "text-white",
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

export {
  Skeleton,
  Drawer,
  Modal,
  Table,
  Input,
  InputError,
  NumberInput,
  Pagination,
  Select,
  Autocomplete,
  Button,
};
