import { FC, ReactNode } from 'react';
import { CustomRenderType, NotionRenderType } from '../type';
import TextRenderer from '../TextRenderer';
import { Renderer } from '..';

interface NumberListItemRendererProps {
  type: NotionRenderType | CustomRenderType;
  source: any;
  parent: any;
}

const NumberListItemRenderer: FC<NumberListItemRendererProps> = (props) => {
  const { source, type, parent } = props;
  let children = parent?.isRoot ? parent.content : parent.children;
  const index = children
    ?.filter((child: any) => child.type === NotionRenderType.NUMBERED_LIST_ITEM)
    .findIndex((child: any) => child.id === source.id);
  return (
    <div>
      <div className="flex items-center gap-2 py-1">
        <span className="">{index + 1}.</span>
        <TextRenderer richTextArr={source[type].rich_text}></TextRenderer>
      </div>
      <div className="ml-4">
        {source.children?.map((child: any, index: number) => {
          return (
            <Renderer
              key={index}
              type={child.type}
              source={child}
              parent={source}
            ></Renderer>
          );
        })}
      </div>
    </div>
  );
};

export default NumberListItemRenderer;
