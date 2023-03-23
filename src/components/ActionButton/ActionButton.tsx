import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";
import { FC } from "react";
import { SortType } from "../../types/SortType";
import Button from '@mui/joy/Button';

type Props = {
  Decorator: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  },
  onClick?: () => void,
  sortBy?: SortType,
  onClickSort?: (() => void)[],
  color: "primary" | "neutral" | "danger" | "info" | "success" | "warning" | undefined,
}

export const ActionButton: FC<Props> = ({
  Decorator,
  onClick,
  sortBy,
  onClickSort,
  color,
}) => {
  return (
    <Button
      sx={{padding: '0 8px 0 0', transition: 'all 0.3s'}}
      variant="outlined"
      color={color}
      endDecorator={<Decorator sx={{ marginRight: 0 }} />}
      onClick={!onClickSort 
        ? (
          onClick
        ) : (
          sortBy === SortType.ASC ? (
            onClickSort[0]
          ) : (
            onClickSort[1]
          )
        )
      }
    />
  );
};
