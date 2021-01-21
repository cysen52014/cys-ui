export function render(h, context) {
  const { props } = context;
  return renderNode(h, props.data, context);
}

export default render;
