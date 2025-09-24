import { BASE_URL } from "@/shared/constants";
import type { ComponentProps, ReactNode } from "react";

export const RouterLink = ({
  to,
  children,
  ...restProps
}: {
  to: string;
  children: ReactNode;
} & ComponentProps<"a">) => {
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    window.history.pushState({}, "", to);
    // ^чтобы изменить URL-адрес страницы браузера без перезагрузки
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <a
      href={`${BASE_URL}${to}`}
      onClick={handleClick}
      {...restProps}>
      {children}{" "}
    </a>
  );
};
