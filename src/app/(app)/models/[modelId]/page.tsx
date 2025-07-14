import SwotCanvas from '@/components/swot-canvas';
import EisenhowerMatrixCanvas from '@/components/eisenhower-matrix-canvas';
import ParetoPrincipleCanvas from '@/components/pareto-principle-canvas';
import BusinessModelCanvas from '@/components/business-model-canvas';
import MaslowsHierarchyCanvas from '@/components/maslows-hierarchy-canvas';
import JohariWindowCanvas from '@/components/johari-window-canvas';
import { modelInfo } from '@/lib/models';
import { notFound } from 'next/navigation';

type ModelPageProps = {
  params: {
    modelId: string;
  };
};

export default function ModelPage({ params }: ModelPageProps) {
  const { modelId } = params;
  const info = modelInfo[modelId];

  if (!info) {
    notFound();
  }

  const renderCanvas = () => {
    switch (modelId) {
      case 'swot':
        return <SwotCanvas />;
      case 'eisenhower-matrix':
        return <EisenhowerMatrixCanvas />;
      case 'pareto-principle':
        return <ParetoPrincipleCanvas />;
      case 'business-model-canvas':
        return <BusinessModelCanvas />;
      case 'maslows-hierarchy':
        return <MaslowsHierarchyCanvas />;
      case 'johari-window':
        return <JohariWindowCanvas />;
      default:
        return (
          <div className="flex items-center justify-center h-96 border rounded-lg bg-card">
            <p className="text-muted-foreground">This model is not yet available.</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold font-headline">{info.name}</h1>
        <p className="text-muted-foreground">{info.description}</p>
      </div>
      {renderCanvas()}
    </div>
  );
}
