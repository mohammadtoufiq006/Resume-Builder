import React from 'react'
import ClassicTemplate from '../resumeTemplates/ClassicTemplate';
import ModernTemplate from '../resumeTemplates/ModernTemplate';
import ExecutiveTemplate from '../resumeTemplates/ExecutiveTemplate';

const TemplatePreview = ({resume, template}) => {
  if(template == "modern") return <ModernTemplate resume={resume}/>;
  if(template == "executive") return <ExecutiveTemplate resume={resume}/>;
  return <ClassicTemplate resume={resume}/>;
}

export default TemplatePreview