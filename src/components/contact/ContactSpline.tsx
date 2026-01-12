"use client";

export default function ContactSpline() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/*
                Spline Scene (Iframe Fallback for Stability)
            */}
            <div className="w-full h-full flex items-center justify-center">
                <video
                    src="/rings.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-80 translate-y-[-8%]"
                />
            </div>
        </div>
    );
}
