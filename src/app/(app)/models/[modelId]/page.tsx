
import SwotCanvas from '@/components/swot-canvas';
import EisenhowerMatrixCanvas from '@/components/eisenhower-matrix-canvas';
import ParetoPrincipleCanvas from '@/components/pareto-principle-canvas';
import BusinessModelCanvas from '@/components/business-model-canvas';
import MaslowsHierarchyCanvas from '@/components/maslows-hierarchy-canvas';
import JohariWindowCanvas from '@/components/johari-window-canvas';
import BostonMatrixCanvas from '@/components/boston-matrix-canvas';
import PortersFiveForcesCanvas from '@/components/porters-five-forces-canvas';
import AidaModelCanvas from '@/components/aida-model-canvas';
import TuckmansStagesCanvas from '@/components/tuckmans-stages-canvas';
import Mckinsey7sFrameworkCanvas from '@/components/mckinsey-7s-framework-canvas';
import AdkarModelCanvas from '@/components/adkar-model-canvas';
import GanttChartCanvas from '@/components/gantt-chart-canvas';
import FishboneDiagramCanvas from '@/components/fishbone-diagram-canvas';
import RaciMatrixCanvas from '@/components/raci-matrix-canvas';
import ScamperModelCanvas from '@/components/scamper-model-canvas';
import DiffusionOfInnovationsCanvas from '@/components/diffusion-of-innovations-canvas';
import FlowModelCanvas from '@/components/flow-model-canvas';
import ChangeManagementCanvas from '@/components/change-management-canvas';
import CommunicationModelCanvas from '@/components/communication-model-canvas';
import { modelInfo } from '@/lib/models';
import { notFound } from 'next/navigation';
import CoffeePage from '../../coffee/page';
import UserGuidePage from '../../user-guide/page';

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
      case 'boston-matrix':
        return <BostonMatrixCanvas />;
      case 'porters-five-forces':
        return <PortersFiveForcesCanvas />;
      case 'aida-model':
        return <AidaModelCanvas />;
      case 'tuckmans-stages':
        return <TuckmansStagesCanvas />;
      case 'mckinsey-7s-framework':
        return <Mckinsey7sFrameworkCanvas />;
      case 'adkar-model':
        return <AdkarModelCanvas />;
      case 'gantt-chart':
        return <GanttChartCanvas />;
      case 'fishbone-diagram':
        return <FishboneDiagramCanvas />;
      case 'raci-matrix':
        return <RaciMatrixCanvas />;
      case 'scamper-model':
        return <ScamperModelCanvas />;
      case 'diffusion-of-innovations':
        return <DiffusionOfInnovationsCanvas />;
      case 'flow-model':
        return <FlowModelCanvas />;
      case 'change-management':
        return <ChangeManagementCanvas />;
      case 'communication-model':
        return <CommunicationModelCanvas />;
      case 'user-guide':
        return <UserGuidePage />;
      case 'coffee':
        return <CoffeePage />;
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
