import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CreateLinkDTO from './dto/create-link.dto';
import { LinkService } from './link.service';
import { Link, LinkDocument } from './schema/schema';

describe('LinkService', () => {
  let service: LinkService;
  let mockLinkSchema: Model<LinkDocument>;

  let links: CreateLinkDTO[];

  const mockLinksRepository = {
    get_all_links: jest.fn().mockResolvedValue(() => {
      return {
        ...links,
      };
    }),

    get_current_link: jest.fn().mockImplementation((title: string) => {
      return {
        ...links[1],
      };
    }),

    create_link: jest.fn().mockImplementation((dto: CreateLinkDTO) => {
      return {
        ...dto,
      };
    }),

    update_current_link: jest
      .fn()
      .mockImplementation((title: string, dto: CreateLinkDTO) => {
        return {
          ...dto,
          short_link: title,
        };
      }),

    delete_current_link: jest.fn().mockImplementation((title: string) => {
      return Date.now();
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinkService,
        {
          provide: getModelToken(Link.name),
          useValue: mockLinkSchema,
        },
      ],
    }).compile();

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

    service = module.get<LinkService>(LinkService);
    mockLinkSchema = module.get<Model<LinkDocument>>(getModelToken(Link.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should be return all links', async () => {
    await service
      .get_all_links()
      .then((data) => {
        expect(data).toEqual({ ...links });
      })
      .catch((e) => e);
  });

  it('Should be retuan a current link', async () => {
    await service
      .get_current_link('about_microservices')
      .then((data) => {
        expect(data).toEqual(links[1]);
      })
      .catch((e) => e);
  });

  it('Should be create a new link', async () => {
    await service
      .create_link({
        url: 'https://www.youtube.com/watch?v=ff8vn3sUSy4&t=1576s',
        short_url: '23TplPdS',
      })
      .then((data) => {
        expect(data).toEqual({ ...links[1] });
      })
      .catch((e) => e);
  });

  it('Should be update a current link', async () => {
    await service
      .update_current_link('46Juzcyx', {
        url: 'https://www.youtube.com/watch?v=ff8vn3sUSy4&t=1576s',
        custom_link: 'microservices_for_beginners',
        short_url: '46Juzcyx',
      })
      .then((data) => {
        expect(data).toEqual({
          url: 'https://www.youtube.com/watch?v=ff8vn3sUSy4&t=1576s',
          short_url: '46Juzcyx',
          custom_link: 'microservices_for_beginners',
        });
      })
      .catch((e) => e);
  });

  it('Should be delete a current link', async () => {
    await service
      .delete_current_link('46Juzcyx')
      .then((data) => {
        expect(data).toEqual(Date.now());
      })
      .catch((e) => e);
  });
});
