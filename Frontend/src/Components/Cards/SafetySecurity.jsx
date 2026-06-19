import { Laptop, EllipsisVertical } from "lucide-react";

function SafetySecurity() {
  return (
    <div className="mb-8">
      <div className="bg-surface-container-low w-full rounded-2xl border border-separator">
        <div className="px-6 md:px-10 mt-5 mb-6">
          <p className="font-medium text-xl text-on-surface">
            Privacy &amp; Safety
          </p>
        </div>
        <div className="p-4 md:p-6">
          <div className="flex flex-row items-center justify-between bg-surface-container-lowest p-4 rounded-xl border border-separator/35">
            <div className="flex flex-row items-center gap-3">
              <Laptop className="text-primary h-12 w-auto p-2 rounded-full bg-primary-muted shrink-0" />
              <div>
                <p className="font-medium text-base sm:text-lg text-on-surface">
                  Your Device
                </p>
                <p className="text-xs sm:text-sm text-primary font-semibold">
                  Current Session
                </p>
              </div>
            </div>
            <EllipsisVertical className="text-secondary shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SafetySecurity;
