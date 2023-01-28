import { EVENT_TRIGGER, MetadataService } from '../metadata';

export function OnEvent(eventName: string): MethodDecorator {
  return (target: any) => {
    MetadataService.setMetadata(target, EVENT_TRIGGER, eventName);
  };
}
