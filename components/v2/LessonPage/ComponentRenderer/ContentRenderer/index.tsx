import TextRenderer from '@/components/v2/NotionRender/TextRenderer';
import { BurialPoint } from '@/helper/burialPoint';
import { FC, useContext, useState } from 'react';
import { VscChevronDown } from 'react-icons/vsc';
import ComponentRenderer from '..';
import { CustomComponent, LessonPageContext } from '../../type';
interface ContentRendererProps {
  component: CustomComponent;
  parent: CustomComponent;
}

const ContentRenderer: FC<ContentRendererProps> = (props) => {
  const { component } = props;
  const [showAll, setShowAll] = useState(true);
  const { leftLength } = useContext(LessonPageContext);
  return (
    <div
      className={`px-[20px] py-[15px] rounded-[10px]  mb-5 ${
        leftLength > 1 ? 'border border-lesson-title-box-border-color' : ''
      }`}
    >
      <div
        className={`flex  justify-between items-center ${
          leftLength > 1 ? 'cursor-pointer' : ''
        }`}
        onClick={() => {
          if (leftLength <= 1) return;
          BurialPoint.track('lesson-content展开');
          setShowAll(!showAll);
        }}
      >
        <span className="font-next-poster-Bold text-[21px] tracking-[1.26px]">
          {component.title || (
            <TextRenderer
              richTextArr={component.content.rich_text}
            ></TextRenderer>
          )}
        </span>
        {leftLength > 1 ? (
          <span
            className={`${
              showAll ? 'rotate-180' : 'rotate-0'
            } transition-transform duration-150 ease-in-out`}
          >
            <VscChevronDown size={24} />
          </span>
        ) : null}
      </div>
      {showAll &&
        component?.children?.map((child) => {
          return (
            <ComponentRenderer
              key={child.id}
              component={child}
              parent={component}
            ></ComponentRenderer>
          );
        })}
    </div>
  );
};

export default ContentRenderer;