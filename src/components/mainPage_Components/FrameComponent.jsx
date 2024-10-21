const FrameComponent = () => {
    return (
        <section className="self-stretch flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
            <footer className="w-[1216px] rounded-21xl [background:linear-gradient(121.9deg,_#fff,_#f7f9ff)] box-border flex flex-col items-start justify-start pt-[82px] px-[69px] pb-[76px] gap-[30px] max-w-full z-[2] text-left text-base text-lightslategray-100 font-paragraph border-[1px] border-solid border-lavender-200 mq450:pt-[53px] mq450:pb-[49px] mq450:box-border mq825:gap-[15px] mq1425:pl-[34px] mq1425:pr-[34px] mq1425:box-border">
                <div className="w-[1216px] h-[398px] relative rounded-21xl [background:linear-gradient(121.9deg,_#fff,_#f7f9ff)] box-border hidden mix-blend-normal max-w-full border-[1px] border-solid border-lavender-200" />
                <div className="flex flex-row items-start justify-start py-0 px-[3px]">
                    <img
                        className="h-[41px] w-[187px] relative object-cover z-[3]"
                        alt=""
                        src="/logo-1@2x.png"
                    />
                </div>
                <div className="self-stretch flex flex-col items-end justify-start gap-[36px] max-w-full mq825:gap-[18px]">
                    <div className="self-stretch flex flex-row items-start justify-between max-w-full gap-[20px] lg:flex-wrap">
                        <div className="w-[356px] flex flex-col items-start justify-start pt-2 px-0 pb-0 box-border max-w-full">
                            <div className="self-stretch relative leading-[150%] z-[3]">
                                Ready to elevate your online presence? Contact us today to
                                discuss your project and discover how we can bring your vision
                                to life.
                            </div>
                        </div>
                        <div className="flex flex-row items-start justify-start gap-[48px] max-w-full mq450:gap-[24px] mq825:flex-wrap">
                            <div className="relative leading-[150%] inline-block min-w-[45px] z-[3]">
                                Home
                            </div>
                            <div className="relative leading-[150%] inline-block min-w-[46px] z-[3]">
                                About
                            </div>
                            <div className="relative leading-[150%] inline-block min-w-[100px] z-[3]">
                                How it Works
                            </div>
                            <div className="relative leading-[150%] inline-block min-w-[66px] z-[3]">
                                Services
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch flex flex-row items-end justify-between max-w-full gap-[20px] mq825:flex-wrap">
                        <div className="flex flex-row items-start justify-start gap-[11px] max-w-full">
                            <img
                                className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px] z-[3]"
                                alt=""
                                src="/frame-19.svg"
                            />
                            <div className="relative leading-[150%] z-[3]">
                                Made with love powered by inkyy.com
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-end pt-0 px-0 pb-px">
                            <div className="flex flex-row items-start justify-start gap-[10px]">
                                <img
                                    className="h-12 w-12 relative min-h-[48px] z-[3]"
                                    loading="lazy"
                                    alt=""
                                    src="/group-27153.svg"
                                />
                                <img
                                    className="h-12 w-12 relative min-h-[48px] z-[3]"
                                    loading="lazy"
                                    alt=""
                                    src="/group-27154.svg"
                                />
                                <img
                                    className="h-12 w-12 relative min-h-[48px] z-[3]"
                                    loading="lazy"
                                    alt=""
                                    src="/group-27155.svg"
                                />
                                <img
                                    className="h-12 w-12 relative min-h-[48px] z-[3]"
                                    loading="lazy"
                                    alt=""
                                    src="/group-27156.svg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </section>
    );
};

export default FrameComponent;
