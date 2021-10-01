import { Test, TestingModule } from '@nestjs/testing';
import CreateLinkDTO from './dto/create-link.dto';
import { LinkController } from './link.controller';
import { LinkGuard } from './link.guard';
import { LinkService } from './link.service';

describe('LinkController', () => {
  let controller: LinkController;

  let links: CreateLinkDTO[];

  const mockLinkRepository = {
    get_all_links: jest.fn().mockReturnValue(() => {
      return {
        ...links,
      };
    }),

    get_current_link: jest.fn().mockReturnValue((title: string) => {
      if (title === links[0].short_url)
        return {
          ...links[0],
        };
    }),

    update_current_link: jest
      .fn()
      .mockReturnValue((title: string, dto: CreateLinkDTO) => {
        return {
          ...dto,
        };
      }),

    create_link: jest.fn().mockReturnValue((dto: CreateLinkDTO) => {
      return {
        ...dto,
      };
    }),

    delete_current_link: jest.fn().mockReturnValue((title: string) => {
      if (title === links[1].short_url) return '507f191e810c19729de860ea';
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinkController],
      providers: [
        LinkService,
        {
          provide: LinkGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
      ],
    })
      .overrideProvider(LinkService)
      .useValue(mockLinkRepository)
      .compile();

    links = [
      { url: 'https://hub.docker.com/_/mongo', short_url: 'eWRhpRV' },
      {
        url: 'https://www.youtube.com/watch?v=ff8vn3sUSy4&t=1576s',
        short_url: '23TplPdS',
        custom_link: 'about_microservices',
      },
      {
        url: 'https://yarnpkg.com/',
        short_url: '46Juzcyx',
        custom_link: 'yarn',
      },
      {
        url: 'https://about.gitlab.com/',
        short_url: 'dBvJIh-H',
        custom_link: 'gitlab',
      },
      { url: 'https://redis.io/', short_url: '2WEKaVNO' },
    ];

    controller = module.get<LinkController>(LinkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should be return all links', async () => {
    await controller
      .get_all_links()
      .then((data) => {
        expect(data).toEqual({ ...links });
      })
      .catch((e) => e);

    expect(mockLinkRepository.get_all_links).toHaveBeenCalledTimes(1);
  });

  it('Should be return a current link', async () => {
    await controller
      .get_current_link('eWRhpRV')
      .then((data) => {
        expect(data).toEqual({ ...links[0] });
      })
      .catch((e) => e);

    expect(mockLinkRepository.get_current_link).toHaveBeenCalledTimes(1);
    expect(mockLinkRepository.get_current_link).toHaveBeenCalledWith('eWRhpRV');
  });

  it('Shoud be create a new link', async () => {
    await controller
      .create_link(links[0])
      .then((data) => {
        expect(data).toEqual({ ...links[0] });
      })
      .catch((e) => e);

    expect(mockLinkRepository.create_link).toHaveBeenCalledTimes(1);
    expect(mockLinkRepository.create_link).toHaveBeenCalledWith(links[0]);
  });

  it('Should be update a current link', async () => {
    await controller
      .update_current_link(links[0].short_url, links[1])
      .then((data) => {
        expect(data).toEqual({ ...links[1] });
      })
      .catch((e) => e);

    expect(mockLinkRepository.update_current_link).toHaveBeenCalledTimes(1);
    expect(mockLinkRepository.update_current_link).toHaveBeenCalledWith(
      links[0].short_url,
      links[1],
    );
  });

  it('Should be delete a current link', async () => {
    await controller
      .delete_current_link('46Juzcyx')
      .then((data) => {
        expect(data).toStrictEqual('507f191e810c19729de860ea');
      })
      .catch((e) => e);

    expect(mockLinkRepository.delete_current_link).toHaveBeenCalledTimes(1);
    expect(mockLinkRepository.delete_current_link).toHaveBeenCalledWith(
      '46Juzcyx',
    );
  });
});
